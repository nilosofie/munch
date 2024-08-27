import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Typography from "@/components/ui/typography";

export type HowToType = {
  head: string;
  body: string;
  key: string;
};

type PropsType = {
  howToArray: HowToType[];
};

export function HowToAccordion({ howToArray }: PropsType) {
  const howToMap = howToArray.map((item) => (
    <AccordionItem value={item.key} key={item.key}>
      <AccordionTrigger>
        <Typography>{item.head}</Typography>
      </AccordionTrigger>
      <AccordionContent>
        <Typography variant="muted">{item.body}</Typography>
      </AccordionContent>
    </AccordionItem>
  ));

  return <>{howToMap}</>;
}
