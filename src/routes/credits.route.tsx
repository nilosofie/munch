import { Link } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { useAuth } from "@/context/auth.context";
import { useCredit } from "@/context/credit.context";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";

import ToastMaster from "@/functions/toast-master.function";

function Credits() {
  const paystackPublic = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;
  const { currentUser } = useAuth();
  const { addCredits } = useCredit();
  const { toast } = useToast();

  const email: string = currentUser?.email ? currentUser.email : "";

  type PriceCardPropTypes = {
    title: string;
    description: string;
    content: string;
    credits: number;
    cost: number;
    buttonText: string;
  };

  const PriceCard = ({
    title,
    description,
    content,
    credits,
    cost,
    buttonText,
  }: PriceCardPropTypes) => {
    return (
      <div className="basis-1/3">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Typography>{content}</Typography>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-center w-full">
              <Button asChild variant="outline">
                <PaystackButton
                  currency="ZAR"
                  email={email}
                  amount={cost}
                  publicKey={paystackPublic}
                  text={buttonText}
                  onSuccess={() => {
                    addCredits(credits);
                    toast({
                      title: ToastMaster("creditsPurchased"),
                      description: `${credits} credits purchased`,
                      action: (
                        <ToastAction altText="Home">
                          <Link to={"/"}>Go home</Link>
                        </ToastAction>
                      ),
                    });
                  }}
                />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const creditPacks: PriceCardPropTypes[] = [
    {
      title: "Snack Stack",
      description: "Grab 5 credits for a measly 20 ZAR (Roughly 1 USD)",
      content: "Perfect for nibbling on the go or testing the MUNCH waters.",
      credits: 5,
      cost: 2000,
      buttonText: "Snag 5 credits",
    },
    {
      title: "MUNCH a Bunch",
      description: "Score 20 credits for just 60 ZAR (About 3 USD)",
      content: "Ideal for regular munchers who love to cook up a storm.",
      credits: 20,
      cost: 6000,
      buttonText: "MUNCH on with 20 credits",
    },
    {
      title: "Feast Beast",
      description:
        "Chow down on 50 credits for a mere 100 ZAR (Approximately 5 USD)",
      content: "For those who crave a hearty helping of MUNCH goodness.",
      credits: 50,
      cost: 10000,
      buttonText: "Feast with 50 credits",
    },
  ];

  const creditPackMap = creditPacks.map((creditPack) => (
    <PriceCard {...creditPack} key={creditPack.title} />
  ));

  return (
    <div className="flex flex-col space-y-4">
      <Typography variant="h2">Need more credits?</Typography>
      <Typography variant="lead">
        No problemo! We've got you covered. With our munch-tastic credit system,
        topping up is as easy as pie and won't put a dent in your wallet.
      </Typography>
      <div className="flex flex-col space-y-2">
        <Typography variant="h3">How it Works:</Typography>
        <ul>
          <li>
            <Typography>
              <strong>Cost: </strong>Just 20 ZAR for 5 credits! (Around 1 USD)
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Free Credits: </strong>Every household receives 15
              complimentary munch credits each month.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Pay-As-You-Munch: </strong>You only pay for extra munch
              credits once your freebies have been gobbled up.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Transparency: </strong>No hidden fees or unexpected
              nibbles.
            </Typography>
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-1">
        <Typography variant="h3">Ready to Beef Up Your Balance?</Typography>
        <Typography variant="muted">
          Purchase munch credits now and keep your freezer feasts flowing.
        </Typography>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 items-center justify-around">
        {creditPackMap}
      </div>
    </div>
  );
}

export default Credits;
