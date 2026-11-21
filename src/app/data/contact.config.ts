export interface ContactConfiguration {
  readonly status: 'pending' | 'available';
  readonly email: string | null;
  readonly phone: string | null;
  readonly whatsappUrl: string | null;
  readonly address: string | null;
}
/** Preencher apenas com canais oficiais confirmados. O briefing nunca realiza envio. */
export const CONTACT_CONFIG: ContactConfiguration = {
  status: 'pending',
  email: null,
  phone: null,
  whatsappUrl: null,
  address: null,
};
