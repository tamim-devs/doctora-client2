import AppointmentSuccessClient from "@/components/appointments/AppointmentSuccessClient";
import { stripe } from "@/lib/stripe";

const SuccessPage = async ({ searchParams }) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    return <div>Invalid payment session</div>;
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status !== "paid") {
    return <div>Payment not completed</div>;
  }

  const appointmentData = {
    doctorId: session.metadata?.doctorId,
    doctorName: session.metadata?.doctorName,
    doctorImage: session.metadata?.doctorImage,
    specialization: session.metadata?.specialization,
    consultationFee: Number(session.metadata?.consultationFee),
    stripeSessionId: session.id,
  };

  return (
    <AppointmentSuccessClient
      appointmentData={appointmentData}
    />
  );
};

export default SuccessPage;