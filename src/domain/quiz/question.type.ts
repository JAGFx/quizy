import { shuffle } from '@/domain/array';

export class Question {
  /**
   * Trivia question ID
   * @private
   */
  private readonly _id: string;
  /**
   * Available answers fot this question (right and wrong)
   * @private
   */
  private readonly _answers: string[];
  /**
   * Valid answer for this question
   * @private
   */
  private readonly _correctAnswer: string;
  /**
   * The question text
   * @private
   */
  private readonly _text: string;

  constructor(
    id: string,
    answers: string[],
    correctAnswer: string,
    text: string
  ) {
    this._id = id;
    this._answers = answers;
    this._correctAnswer = correctAnswer;
    this._text = text;
  }

  get id(): string {
    return this._id;
  }

  get answers(): string[] {
    return this._answers;
  }

  get correctAnswer(): string {
    return this._correctAnswer;
  }

  get text(): string {
    return this._text;
  }

  /**
   * Determinate if the giver answer is right or not
   * @param givenAnswer
   */
  isAValidAnswer(givenAnswer: string): boolean {
    return givenAnswer === this.correctAnswer;
  }
}

export class QuestionCollection extends Map<string, Question> {
  /**
   * Method to be able to generate a Question array from Trivia API
   * @param questions
   * @return QuestionCollection
   */
  static fromArray(questions: any): QuestionCollection {
    const collection = new this();

    questions.map((question: any) => {
      collection.set(
        question.id,
        new Question(
          question.id,
          shuffle([...question.incorrectAnswers, question.correctAnswer]),
          question.correctAnswer,
          question.question
        )
      );
    });

    return collection;
  }

  /**
   * Get size of the current collection
   * @return number
   */
  get length(): number {
    return Array.from(this.values()).length;
  }

  /**
   * Get the place of  quesrion in the collection
   * @param question
   * @return number
   */
  indexOfValue(question: Question): number {
    return Array.from(this.values()).indexOf(question);
  }
}
