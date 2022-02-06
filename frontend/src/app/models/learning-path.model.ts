export interface LPModel {
  _id?:string,
  name: string;
  category: string;
  type: string;
  topics: { topicName: string, topicDes: string, resources: string[], assessments: string[] }[];
  userId: string | null;
}