const steps = ['Create', 'Review', 'Fix', 'Export'];

export function MobileStepProgress({ active = 'Create' }: { active?: string }) {
  return (
    <div className="mobile-step-progress" aria-label="Mobile workflow progress">
      {steps.map((step, index) => (
        <span key={step} className={step === active ? 'active' : ''}>
          <b>{index + 1}</b>{step}
        </span>
      ))}
    </div>
  );
}
