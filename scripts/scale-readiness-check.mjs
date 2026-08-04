const required = [
  'DATABASE_URL', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'STRIPE_PRICE_CREATOR', 'STRIPE_PRICE_STUDIO',
  'PRIVATE_STORAGE_BUCKET', 'QUEUE_PROVIDER', 'QUEUE_ENDPOINT_URL', 'OBSERVABILITY_WEBHOOK_URL', 'REDIS_URL'
];
const configured = required.filter((name) => Boolean(process.env[name]));
console.log('CineLoom v3.3 scale readiness check');
console.log(`Configured critical services: ${configured.length}/${required.length}`);
if (configured.length < required.length) {
  console.warn('Missing live-service variables:', required.filter((name) => !process.env[name]).join(', '));
  console.warn('Architecture is included, but live 2000-user readiness requires these services to be configured in Vercel.');
  process.exitCode = 0;
} else {
  console.log('All critical scale variables configured. Run load tests before public launch.');
}
