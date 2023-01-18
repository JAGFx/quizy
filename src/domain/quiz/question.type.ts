import { shuffle } from "@/domain/array";

export class Question {
  private readonly _id: string;
  private readonly _answers: string[];
  private readonly _correctAnswer: string;
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

  isAValidAnswer(givenAnswer: string): boolean {
    return givenAnswer === this.correctAnswer;
  }
}

export class QuestionCollection extends Map<string, Question> {
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

  get length(): number {
    return Array.from(this.values()).length;
  }

  indexOfValue(question: Question): number {
    return Array.from(this.values()).indexOf(question);
  }
}
