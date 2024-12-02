export function convertToApiFormat(payload: any): any {
  const formattedPayload: any = {};

  for (const [key, value] of Object.entries(payload)) {
    // Convert camelCase to PascalCase (proper case)
    const newKey = key
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Adds a space between lower and uppercase letters
      .replace(/(^[a-z])|(\s+[a-z])/g, (match) => match.toUpperCase()) // Capitalizes the first letter after space or at the beginning
      .replace(/\s+/g, ''); // Remove spaces

    formattedPayload[newKey] = value;
  }

  return formattedPayload;
}
