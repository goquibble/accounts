import os
import shutil
import subprocess
import zipfile

# ---------------------------------------------------------------------------
# Directories/packages to EXCLUDE from the Lambda zip
# ---------------------------------------------------------------------------
# boto3/botocore/s3transfer are already in the Lambda Python runtime
# sqladmin + wtforms + jinja2 are only used in DEBUG (admin panel)
# __pycache__, .dist-info, tests are unnecessary at runtime
EXCLUDED_PACKAGES = {
    "boto3",
    "botocore",
    "s3transfer",
    "sqladmin",
    "wtforms",
}
EXCLUDED_SUFFIXES = {".pyc", ".pyo"}
EXCLUDED_DIR_NAMES = {"__pycache__", "tests", "test"}
EXCLUDED_DIR_PATTERNS = {".dist-info"}


def _should_exclude(rel_path: str) -> bool:
    """Return True if the file/directory should be excluded from the zip."""
    parts = rel_path.replace("\\", "/").split("/")

    for part in parts:
        # skip __pycache__, tests, test dirs
        if part in EXCLUDED_DIR_NAMES:
            return True
        # skip .dist-info directories
        if any(part.endswith(pat) for pat in EXCLUDED_DIR_PATTERNS):
            return True
        # skip excluded top-level packages (e.g. boto3, botocore, ...)
        # they sit at the root of the build folder
        if parts[0] in EXCLUDED_PACKAGES or parts[0].startswith(
            tuple(f"{p}-" for p in EXCLUDED_PACKAGES)
        ):
            return True

    # skip .pyc / .pyo files
    if os.path.splitext(rel_path)[1] in EXCLUDED_SUFFIXES:
        return True

    return False


# ---------------------------------------------------------------------------
# 1. Clean previous builds
# ---------------------------------------------------------------------------
shutil.rmtree("build", ignore_errors=True)
if os.path.exists("function.zip"):
    os.remove("function.zip")

# ---------------------------------------------------------------------------
# 2. Create build folder & install dependencies
# ---------------------------------------------------------------------------
os.makedirs("build", exist_ok=True)

subprocess.check_call(
    ["pip", "install", "-r", "requirements.txt", "-t", "build", "--no-cache-dir"]
)

# ---------------------------------------------------------------------------
# 3. Copy app code
# ---------------------------------------------------------------------------
shutil.copytree("app", "build/app")

# ---------------------------------------------------------------------------
# 4. Create zip with filtering
# ---------------------------------------------------------------------------
included = 0
excluded = 0

with zipfile.ZipFile("function.zip", "w", zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk("build"):
        for filename in files:
            full_path = os.path.join(root, filename)
            rel_path = os.path.relpath(full_path, "build")

            if _should_exclude(rel_path):
                excluded += 1
                continue

            zf.write(full_path, rel_path)
            included += 1

zip_size_mb = os.path.getsize("function.zip") / (1024 * 1024)
print(f"Lambda package created: function.zip ({zip_size_mb:.1f} MB)")
print(f"  Files included: {included}  |  Files excluded: {excluded}")
