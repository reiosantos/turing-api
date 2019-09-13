import _stripe from "stripe";

class StripeHelper {
	static connect_stripe() {
		return _stripe(process.env.STRIPE_SECRET_KEY || '');
	}
	
	static async makeCharge(chargeObject) {
		const stripe = this.connect_stripe();
		return stripe.charges.create(chargeObject);
	}
}

export default StripeHelper;

export async function makeCharge(chargeObject) {
	const stripe = connect_stripe();
	return stripe.charges.create(chargeObject);
}
