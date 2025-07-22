const errorMessages = {
  'title: Path `title` is required.': 'The title is required',
  'url: Path `url` is required.': 'The url is required',
  'username or password missing': 'Username or Password missing',

  DEFAULT: 'An error happend. Try again.',
};

export function mapBackendErrors(errorString) {
  if (!errorString) {
    return [errorMessages.DEFAULT];
  }

  // Ejemplo: "Blog validation failed: title: Path `title` is required., url: Path `url` is required."
  if (errorString.includes('validation failed')) {
    const parts = errorString.split(': ').slice(1).join(': ').split(', ');
    const mapped = parts.map((err) => errorMessages[err.trim()] || err.trim());
    return mapped.length ? mapped : [errorMessages.DEFAULT];
  }

  const trimmed = errorString.trim();
  return [errorMessages[trimmed] || errorMessages.DEFAULT];
}

export default errorMessages;
