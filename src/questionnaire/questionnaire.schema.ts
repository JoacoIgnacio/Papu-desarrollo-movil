import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Questionnaire extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'Question' })
  questions: Types.ObjectId[];
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
