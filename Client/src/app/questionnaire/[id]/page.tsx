import { Questionnaire } from "@/components/Questionnaire";

const QuestionnairePage = ({ params }: any) => {
  const { id } = params;

  return <Questionnaire id={id} />;
};

export default QuestionnairePage;
