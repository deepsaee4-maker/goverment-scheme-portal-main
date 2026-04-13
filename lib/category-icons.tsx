import {
  Briefcase,
  FileText,
  GraduationCap,
  HeartPulse,
  Landmark,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  FileText,
  GraduationCap,
  HeartPulse,
  Landmark,
  Sprout,
  Users,
};

export function getCategoryIcon(iconName: string): LucideIcon {
  return iconMap[iconName] ?? Landmark;
}

export const availableIcons = Object.keys(iconMap);
