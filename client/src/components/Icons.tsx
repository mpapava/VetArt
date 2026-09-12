import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(children: React.ReactNode, { size = 22, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {children}
    </svg>
  );
}

export const CheckupIcon = (p: IconProps) => base(<path d="M4.8 2.3a.7.7 0 0 0-1.1.9l1.4 2.2c-1 1-1.6 2.4-1.6 4a5.2 5.2 0 0 0 5.2 5.2 5 5 0 0 0 2.5-.7l6.5 6.5a2 2 0 0 0 2.8-2.8l-6.5-6.5a5 5 0 0 0 .7-2.5A5.2 5.2 0 0 0 9.4 3.4c-1.6 0-3 .6-4 1.6L3.2 3.6" />, p);
export const VaccinationIcon = (p: IconProps) => base(<><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" /><circle cx="12" cy="12" r="3" /></>, p);
export const SurgeryIcon = (p: IconProps) => base(<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />, p);
export const LabIcon = (p: IconProps) => base(<path d="M9 3h6l1 5-4 3 4 3-1 7H9l-1-7 4-3-4-3 1-5Z" />, p);
export const DentalIcon = (p: IconProps) => base(<><path d="M12 2c-2 3-3 4-3 6a3 3 0 0 0 6 0c0-2-1-3-3-6Z" /><path d="M6 14c0 4 3 7 6 7s6-3 6-7" /></>, p);
export const ExoticIcon = (p: IconProps) => base(<><path d="M4 12c2-4 6-6 8-6s6 2 8 6c-2 4-6 6-8 6s-6-2-8-6Z" /><circle cx="12" cy="12" r="2" /></>, p);
export const MicrochipIcon = (p: IconProps) => base(<><rect x="3" y="11" width="18" height="8" rx="2" /><path d="M7 11V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" /></>, p);
export const HospitalizationIcon = (p: IconProps) => base(<path d="M3 12h18M3 12a9 9 0 0 1 18 0M3 12v6a2 2 0 0 0 2 2h1M21 12v6a2 2 0 0 1-2 2h-1" />, p);

export const LoveIcon = (p: IconProps) => base(<path d="M12 21s-7.5-4.6-10-9.1C.6 8.6 2 5 5.6 4.2c2-.4 3.8.5 5 2.1 1.2-1.6 3-2.5 5-2.1C19.2 5 20.6 8.6 19.2 11.9 16.7 16.4 12 21 12 21Z" />, p);
export const ModernIcon = (p: IconProps) => base(<><path d="M9 2h6v4h4v16H5V6h4V2Z" /><path d="M12 9v6M9 12h6" /></>, p);
export const TransparencyIcon = (p: IconProps) => base(<path d="M20 6 9 17l-5-5" />, p);

export const DogIcon = (p: IconProps) => base(<><path d="M10 5.5c-1.5-2-4-2.5-5.5-1S3 8 5 9.5M14 5.5c1.5-2 4-2.5 5.5-1S21 8 19 9.5" /><path d="M12 21c-3.5 0-6-2-6-5 0-2 1-3 1-5 0-2 2-4 5-4s5 2 5 4c0 2 1 3 1 5 0 3-2.5 5-6 5Z" /></>, p);
export const CatIcon = (p: IconProps) => base(<><path d="M4 20c0-4 1-6 1-9 0-3 2-5 4-5l1 3h4l1-3c2 0 4 2 4 5 0 3 1 5 1 9" /><path d="M7 6 5 3M17 6l2-3" /><circle cx="10" cy="12" r=".5" fill="currentColor" /><circle cx="14" cy="12" r=".5" fill="currentColor" /></>, p);
export const BirdIcon = (p: IconProps) => base(<><path d="M16 8a4 4 0 0 1-4 4c-3 0-5 2-5 5v1M16 8a2 2 0 1 1 4 0c0 1.5-1 2-1 3M16 8l3-2" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></>, p);

export const ClinicIcon = ModernIcon;

export const PinIcon = (p: IconProps) => base(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></>, p);
export const PhoneIcon = (p: IconProps) => base(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />, p);
export const MailIcon = (p: IconProps) => base(<><path d="M22 6 12 13 2 6" /><rect x="2" y="4" width="20" height="16" rx="2" /></>, p);
export const FacebookIcon = ({ size = 22, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.2 22 17.06 22 12.06Z" />
  </svg>
);
export const StarIcon = ({ size = 18, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1L12 2Z" />
  </svg>
);
export const CalendarIcon = (p: IconProps) => base(<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>, p);

export const ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  checkup: CheckupIcon,
  vaccination: VaccinationIcon,
  surgery: SurgeryIcon,
  lab: LabIcon,
  dental: DentalIcon,
  exotic: ExoticIcon,
  microchip: MicrochipIcon,
  hospitalization: HospitalizationIcon,
};

export function Icon({ name, ...p }: IconProps & { name: string }) {
  const Cmp = ICONS[name] || CheckupIcon;
  return <Cmp {...p} />;
}

// Brand mark and wordmark are the clinic's real logo artwork, served as
// static images from /brand/ (see components/Nav.tsx, Footer.tsx, pages/Home.tsx)
// rather than redrawn as SVG.
