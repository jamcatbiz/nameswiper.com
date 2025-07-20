export const defaultPlanId = "free"

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description:
      "A free plan to get you started! Discover names, save them, and find your favorites.",
    price: "$0",
    priceIntervalName: "forever",
    stripe_price_id: null,
    features: ["Name Swiper", "Save and Edit Preferences"],
  },
  {
    id: "pro",
    name: "Pro",
    description:
      "Swiping is better with friends and family!  The Pro plan lets you compare your likes with as many users as you'd like and create goals.",
    price: "$10.93",
    priceIntervalName: "/year",
    stripe_price_id: "price_1Rn1GMDCk4dDRx86acnl9EzL",
    stripe_product_id: "prod_SiSAVR51YeObvH",
    features: [
      "Everything in Free",
      "Match Your Likes With Others",
      "Make Goals and Objectives",
    ],
  },
]
