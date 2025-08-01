declare global {
  interface Window {
    kuromoji: KuroMoji;
    challenge: HTMLDialogElement;
    reader: HTMLDialogElement;
  }
}

export {};
