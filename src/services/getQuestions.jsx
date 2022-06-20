export default (
  async function getQuestions(token) {
    const request = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );

    try {
      const { results } = await request.json();
      return results;
    } catch (error) {
      console.log(error);
    }
  }
);
