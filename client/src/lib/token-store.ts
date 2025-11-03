class TokenStore {
  private token: string | null = null;

  get(): string | null {
    return this.token;
  }

  set(value: string): void {
    if (this.token === value) return;
    this.token = value;
  }

  clear(): void {
    this.token = null;
  }
}

// shared singleton instance
export const tokenStore = new TokenStore();
