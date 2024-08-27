import Typography from "@/components/ui/typography";

function UserGuide() {
  return (
    <div className="flex flex-col space-y-4">
      <Typography variant="h1">User Guide</Typography>
      <Typography variant="lead">
        Welcome to the User Guide for MUNCH!—your go-to resource for mastering
        this marvelous app! Here, you'll find everything you need to navigate
        MUNCH! like a pro, from tracking your freezer inventory with ease to
        discovering delicious meal ideas with a fun twist. This guide will walk
        you through all the nifty features, tips, and tricks to help you make
        the most out of every meal moment. Get ready to scan, sort, and savor
        with style—your journey to becoming a freezer genius starts now!
      </Typography>
      <div className="flex flex-col space-y-5">
        <div className="bg-green-300 min-w-full">
          <iframe
            src="https://scribehow.com/page-embed/MUNCH_User_Guide__k3CRzbFBTzuRd9Yux5Fk0g?as=scrollable&skipIntro=true"
            width="100%"
            height="640"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default UserGuide;
