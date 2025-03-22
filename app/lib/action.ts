
export async function callLanguageModelAPI(message: string) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return data.response;
  } catch (error) {
    console.error("Error calling chat API:", error);
    return "Sorry, I couldn't process your request at the moment.";
  }
}