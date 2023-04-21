const { Post } = require('../models');

const postData = [
  {
    title: 'The Flip Side of the Bitcoin',
    content: "As bitcoin’s price has exploded this year — from $770 in January, to Thursday morning’s record-breaking $19,000 breach — the 49er-esque gold rush is in full swing. Ethereum and Litecoin are starting to really heat up as well due to the unattainable-for-most nature of the bitcoin market. While there has, no doubt, been an exponential increase in the amount of millionaires and billionaires created by the 100-yard dash to the hottest investment on earth, what is the environmental impact of the boom? Does that thought even factor into the minds of those raking in dividends hand over fist or even those of the cryptocurious?",
    user_id: 1
  },
  {
    title: 'On Predicting the Future in an Exponentially Growing World',
    content: "When I applied, early decision, to university in late 1996, I chose for my essay the option to write what would be the lead article of a ‘major [imaginary] newspaper’ on January 1st, 2010. As editor and sole journalist for this fantastical publication thirteen years in the future, I made the executive decision to lead off with my own think piece. The editorial declared that our widely distributed daily would no longer be making New Year’s predictions due to a rather rocky track record of being so very wrong.",
    user_id: 2
  },
  {
    title: 'California AB5 and the Future of the Gig Economy',
    content: "According to naysayers of California’s Assembly Bill 5, signed into law Wednesday by Governor Newsom, the gig economy as we know it — at least in the world’s fifth largest economy — might begin to unravel after it takes effect on January 1, 2020. The landmark bill, passed overwhelmingly by the state’s legislature, makes it considerably harder for companies to classify workers as independent contractors. Failure to comply with the stricter guidelines requires that they be classified (or reclassified) as employees, which would afford the workers guaranteed benefits and minimum wage protections (currently, $12 per hour state wide and as high as $15 in some cities). This is seen by some as a huge blow to gig economy platforms, notably, Uber and Lyft.",
    user_id: 3
  }
  ];

  const seedPost = () => Post.bulkCreate(postData);

  module.exports = seedPost;