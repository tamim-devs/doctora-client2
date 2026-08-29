import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();

    const origin =
      headersList.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL;

    const {
      doctorId,
      doctorName,
      doctorImage,
      specialization,
      consultationFee,
    } = await req.json();

    if (!doctorId || !doctorName || !consultationFee) {
      return NextResponse.json(
        {
          error: "Doctor information is missing",
        },
        {
          status: 400,
        },
      );
    }

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        line_items: [
          {
            price_data: {
              currency: "usd",

              product_data: {
                name: `Appointment with Dr. ${doctorName}`,

                description:
                  specialization ||
                  "Doctor Consultation",

                images: doctorImage
                  ? [doctorImage]
                  : [],
              },

              unit_amount: Math.round(
                Number(consultationFee) * 100
              ),
            },

            quantity: 1,
          },
        ],

        mode: "payment",

        metadata: {
          doctorId: String(doctorId),

          doctorName: doctorName,

          doctorImage: doctorImage || "",

          specialization:
            specialization || "",

          consultationFee: String(
            consultationFee
          ),
        },

        success_url:
          `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${origin}/doctors/${doctorId}`,
      });

    return NextResponse.json({
      url: session.url,
    });

  } catch (err) {
    console.error(
      "Stripe checkout error:",
      err
    );

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      },
    );
  }
}