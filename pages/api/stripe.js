import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51NUw9MJUGwum9YLhkOimczfgjGWy1PbSKelrNgBtqDDIzytDnNNNL9OD6zlJQ1qsz9Zbf9OHWgkrqL2VD0IoteoA00JU4xnqvB"
);

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        line_items: req.body.map((item) => {
          const img = item.image.asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/cw9np7e9/production/"
            )
            .replace("-jpg", ".jpg");
          return {
            price_data: {
              currency: "USD",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: false,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cart`,
      };
      //checkout session
      const session = await stripe.checkout.sessions.create(params);
      console.log(session);
      res.status(200).json(session);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("method not allowd");
  }
}
