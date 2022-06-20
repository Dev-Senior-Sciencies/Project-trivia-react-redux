export default (
  async function getToken() {
    const request = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );

    try {
      const { token } = await request.json();
      return token;
    } catch (error) {
      console.log(error);
    }
  }
);
