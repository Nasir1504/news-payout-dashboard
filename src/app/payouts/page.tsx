import PayoutCalculator from '@/components/PayoutCalculator';

export default async function PayoutsPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payout Calculator</h1>
      <PayoutCalculator />
    </main>
  );
}
