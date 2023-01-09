export const file2Base64 = (file: File): Promise<string> =>
  new Promise((resolve: (v: string) => void, reject: (reason?: unknown) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const res = reader.result as string;
      const base64 = res.split('base64,')[1];
      resolve(base64);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
