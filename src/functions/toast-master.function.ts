type InstancePropType =
  | "login"
  | "creditsPurchased"
  | "inventoryAdd"
  | "planning"
  | "munch"
  | "inventoryRemove"
  | "createHousehold"
  | "noCredit"
  | "feedback";

function ToastMaster(instance: InstancePropType) {
  const arrLength = instances[instance].length;

  const rand = Math.floor(Math.random() * arrLength);

  return instances[instance][rand];
}

export default ToastMaster;

type InstanceType = {
  login: string[];
  creditsPurchased: string[];
  inventoryAdd: string[];
  planning: string[];
  munch: string[];
  inventoryRemove: string[];
  createHousehold: string[];
  noCredit: string[];
  feedback: string[];
};

const instances: InstanceType = {
  login: [
    "Welcome back, hungry hero!",
    "Greetings, freezer friend!",
    "Ready to munch? Let's roll!",
    "Time to thaw out some fun!",
    "Fridge frenzy begins now!",
    "Hello there, freezer fanatic!",
    "Back for another round of foodie fun?",
    "Let's stir up some tasty trouble!",
    "Welcome aboard the MUNCH! express!",
    "Ready to rock and roll with your rolls?",
  ],
  creditsPurchased: [
    "Credits loaded, let the munching begin!",
    "Success tastes sweet, just like your meal plans!",
    "You've got the credit crunch under control!",
    "Credit success! Time to feast like royalty!",
    "Kudos! You're officially a credit connoisseur!",
    "Bravo! You've leveled up your munching game!",
    "Credit crunch? Not a problem for you!",
    "Your freezer just got a whole lot happier!",
    "With credits in hand, you're unstoppable!",
    "MUNCH on, credit champion!",
  ],
  inventoryAdd: [
    "Another item bites the ice!",
    "Inventory increased, hunger appeased!",
    "Stocked up and ready to rock!",
    "Inventory boost achieved, time to feast!",
    "Way to go! Your freezer just got cooler!",
    "Another tasty addition to the collection!",
    "Your inventory is looking mighty munchable!",
    "With every item added, your munch game gets stronger!",
    "Inventory expansion: mission accomplished!",
    "Keep 'em coming! Your freezer's hungry for more!",
  ],
  planning: [
    "Planning prowess at its finest!",
    "Another item makes the leap from freezer to table!",
    "Inventory items, meet meal plans. Let the magic begin!",
    "Inventory items enlisted for mealtime duty!",
    "You're a planning pro! Keep those items coming!",
    "Inventory to planning table: mission accomplished!",
    "Meal plans just got a whole lot tastier!",
    "Your planning table is shaping up to be a feast!",
    "With each addition, your meal plans get more magnificent!",
    "Inventory items: Check. Meal plans: Check. Let's munch!",
  ],
  munch: [
    "Munch-tastic! Another item vanquished!",
    "Nom nom nom! That item didn't stand a chance!",
    "Munch mission accomplished!",
    "Farewell, tasty treat! You've been devoured!",
    "Munch mastery achieved!",
    "You're a munching marvel!",
    "Bravo! You've conquered the craving!",
    "Another one bites the munch!",
    "Munching madness! Keep it up!",
    "You're on a munching roll!",
  ],
  inventoryRemove: [
    "Farewell, freezer friend! Until we munch again!",
    "Inventory item removed! Keep that freezer fresh!",
    "Decluttering like a champ! Goodbye, excess!",
    "Making room for new munchables! Adios, old stock!",
    "Out with the old, in with the munch-worthy!",
    "Inventory trimmed, munching streamlined!",
    "You're a freezer wizard! Poof! Item removed!",
    "Inventory edit success! High five, freezer hero!",
    "Saying goodbye to the surplus! Hello, organized bliss!",
    "Freezer Feng Shui achieved! Bye-bye, clutter!",
  ],
  createHousehold: [
    "Household created! Welcome to the munchy family!",
    "Congratulations! Your munchy abode awaits!",
    "Home sweet munchy home! Household created!",
    "You're officially the head chef of this household!",
    "Household creation complete! Let the munching begin!",
    "Bravo! Your munchy haven has been established!",
    "Munchy vibes only! Household created successfully!",
    "Your munchy kingdom has been founded! Huzzah!",
    "Household creation success! Let's get munching!",
    "Welcome to your munchy sanctuary! Household created!",
  ],
  noCredit: [
    "Running low on credits? Time to restock and munch on!",
    "Uh-oh! Looks like you need a credit refill to continue munching!",
    "Low on credits? No worries! Let's top up and keep munching!",
    "Out of credits? Time to refuel and get back to munching!",
    "Credit crunch alert! Let's buy more and keep the munching going!",
    "Running on empty? Time to stock up on credits and munch away!",
    "Running low on munching fuel? Let's buy credits and keep going!",
    "Oops! Looks like you're running low on credits. Time to restock!",
    "Low on credits? Fear not! Let's purchase more and munch on!",
    "Credit stash running low? It's time to top up and keep munching!",
  ],
  feedback: [
    "Thanks a bunch for your feedback crunch!",
    "Hooray! Your feedback saves the day!",
    "You're the star who's raised the bar with your feedback jar!",
    "High five! Your feedback makes us thrive!",
    "Woot woot! Your feedback's super cute!",
    "Cheers for your feedback, you're a true MUNCH! mate!",
    "Thanks a munch for sharing your hunch!",
    "Your feedback rocks, it's like finding treasure in a box!",
    "You're a feedback guru, and we appreciate you!",
    "Wowzers! Your feedback's like a bouquet of flowers!",
  ],
};
