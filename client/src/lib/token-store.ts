class TokenStore {
  private token: string | null = null;
  private subscribers: Array<() => void> = [];

  private notify() {
    this.subscribers.forEach((cb) => {
      cb();
    });
  }

  public get(): string | null {
    return this.token;
  }

  public set(value: string): void {
    if (this.token === value) return;
    this.token = value;
    this.notify();
  }

  public subscribe(cb: () => void) {
    this.subscribers.push(cb);
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== cb);
    };
  }
}

// shared singleton instance
export const tokenStore = new TokenStore();
