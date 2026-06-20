// All admin module configs. Single source of truth — the dynamic admin route
// renders any module by name using this metadata.
import type { LucideIcon } from "lucide-react";
import {
  Users,
  Wrench,
  Info,
  MessageSquareQuote,
  Briefcase,
  FileText,
  HelpCircle,
  CreditCard,
  Factory,
  GraduationCap,
  Image as ImageIcon,
  BarChart3,
  Inbox,
  MessagesSquare,
  Settings as SettingsIcon,
} from "lucide-react";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "image"
  | "url"
  | "email"
  | "select"
  | "tags";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
  helperText?: string;
  hideInList?: boolean;
};

export type ModuleConfig = {
  slug: string;
  label: string;
  icon: LucideIcon;
  table: string;
  description: string;
  orderBy: { column: string; ascending: boolean };
  fields: FieldConfig[];
  listColumns: string[];
  readonly?: boolean; // e.g. leads/messages — list only
  insertOnly?: boolean;
};

const publishedField: FieldConfig = {
  name: "is_published",
  label: "Published",
  type: "boolean",
};
const orderField: FieldConfig = {
  name: "display_order",
  label: "Display order",
  type: "number",
  helperText: "Lower numbers appear first.",
};

export const ADMIN_MODULES: ModuleConfig[] = [
  {
    slug: "team",
    label: "Team",
    icon: Users,
    table: "team_members",
    description: "Founders & team members shown on the About / Home pages.",
    orderBy: { column: "display_order", ascending: true },
    listColumns: ["name", "title", "is_founder", "display_order"],
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "title", label: "Role / title", type: "text", required: true },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "image_url", label: "Photo", type: "image" },
      { name: "email", label: "Email", type: "email" },
      { name: "linkedin_url", label: "LinkedIn URL", type: "url" },
      { name: "is_founder", label: "Founder", type: "boolean" },
      orderField,
    ],
  },
  {
    slug: "services",
    label: "Services",
    icon: Wrench,
    table: "services",
    description: "Service offerings shown on /services and the home page.",
    orderBy: { column: "display_order", ascending: true },
    listColumns: ["title", "slug", "is_published", "display_order"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true, helperText: "URL identifier, e.g. ai-automation" },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon name (lucide)", type: "text", placeholder: "Bot, TrendingUp, …" },
      { name: "image_url", label: "Image", type: "image" },
      orderField,
      publishedField,
    ],
  },
  {
    slug: "about",
    label: "About sections",
    icon: Info,
    table: "about_sections",
    description: "Story, mission, vision and other blocks on the About page.",
    orderBy: { column: "display_order", ascending: true },
    listColumns: ["section_key", "heading", "display_order"],
    fields: [
      { name: "section_key", label: "Section key", type: "text", required: true, helperText: "Unique key, e.g. mission" },
      { name: "heading", label: "Heading", type: "text", required: true },
      { name: "body", label: "Body", type: "textarea" },
      { name: "image_url", label: "Image", type: "image" },
      orderField,
    ],
  },
  {
    slug: "testimonials",
    label: "Testimonials",
    icon: MessageSquareQuote,
    table: "testimonials",
    description: "Client testimonials shown in the marquee + carousel.",
    orderBy: { column: "display_order", ascending: true },
    listColumns: ["client_name", "client_company", "rating", "is_published"],
    fields: [
      { name: "client_name", label: "Client name", type: "text", required: true },
      { name: "client_role", label: "Role", type: "text" },
      { name: "client_company", label: "Company", type: "text" },
      { name: "client_image_url", label: "Avatar", type: "image" },
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "rating", label: "Rating (1-5)", type: "number" },
      orderField,
      publishedField,
    ],
  },
  {
    slug: "case-studies",
    label: "Case studies",
    icon: Briefcase,
    table: "case_studies",
    description: "Portfolio entries.",
    orderBy: { column: "display_order", ascending: true },
    listColumns: ["title", "client", "industry", "is_published"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "client", label: "Client", type: "text" },
      { name: "industry", label: "Industry", type: "text" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "body", label: "Full body", type: "textarea" },
      { name: "cover_image_url", label: "Cover image", type: "image" },
      orderField,
      publishedField,
    ],
  },
  {
    slug: "blog",
    label: "Blog posts",
    icon: FileText,
    table: "blog_posts",
    description: "Articles for the blog.",
    orderBy: { column: "created_at", ascending: false },
    listColumns: ["title", "author", "is_published"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "body", label: "Body (markdown)", type: "textarea" },
      { name: "cover_image_url", label: "Cover image", type: "image" },
      { name: "author", label: "Author", type: "text" },
      { name: "tags", label: "Tags", type: "tags", helperText: "Comma-separated" },
      publishedField,
    ],
  },
  {
    slug: "faqs",
    label: "FAQs",
    icon: HelpCircle,
    table: "faqs",
    description: "Frequently asked questions.",
    orderBy: { column: "display_order", ascending: true },
    listColumns: ["question", "category", "is_published"],
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "category", label: "Category", type: "text" },
      orderField,
      publishedField,
    ],
  },
  {
    slug: "pricing",
    label: "Pricing plans",
    icon: CreditCard,
    table: "pricing_plans",
    description: "Pricing tiers shown on the pricing page.",
    orderBy: { column: "display_order", ascending: true },
    listColumns: ["name", "price", "is_featured", "is_published"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "price", label: "Price (display)", type: "text", required: true, placeholder: "$499" },
      { name: "period", label: "Period", type: "text", placeholder: "/month" },
      { name: "cta_label", label: "CTA label", type: "text" },
      { name: "is_featured", label: "Featured", type: "boolean" },
      orderField,
      publishedField,
    ],
  },
  {
    slug: "industries",
    label: "Industries",
    icon: Factory,
    table: "industries",
    description: "Industries served.",
    orderBy: { column: "display_order", ascending: true },
    listColumns: ["name", "is_published"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon (lucide)", type: "text" },
      { name: "image_url", label: "Image", type: "image" },
      orderField,
      publishedField,
    ],
  },
  {
    slug: "careers",
    label: "Careers",
    icon: GraduationCap,
    table: "careers",
    description: "Job openings.",
    orderBy: { column: "display_order", ascending: true },
    listColumns: ["title", "department", "location", "is_published"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "department", label: "Department", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "employment_type", label: "Type", type: "text", placeholder: "Full-time" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "requirements", label: "Requirements", type: "textarea" },
      { name: "apply_url", label: "Apply URL", type: "url" },
      orderField,
      publishedField,
    ],
  },
  {
    slug: "clients",
    label: "Client logos",
    icon: ImageIcon,
    table: "clients_logos",
    description: "Featured client logos.",
    orderBy: { column: "display_order", ascending: true },
    listColumns: ["client_name", "is_published"],
    fields: [
      { name: "client_name", label: "Client name", type: "text", required: true },
      { name: "logo_url", label: "Logo", type: "image", required: true },
      { name: "website_url", label: "Website", type: "url" },
      orderField,
      publishedField,
    ],
  },
  {
    slug: "stats",
    label: "Stats / metrics",
    icon: BarChart3,
    table: "stats",
    description: "Success metrics on the home page.",
    orderBy: { column: "display_order", ascending: true },
    listColumns: ["label", "value", "is_published"],
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "value", label: "Value", type: "text", required: true },
      { name: "suffix", label: "Suffix", type: "text", placeholder: "+, %, M" },
      { name: "icon", label: "Icon (lucide)", type: "text" },
      orderField,
      publishedField,
    ],
  },
  {
    slug: "leads",
    label: "Leads",
    icon: Inbox,
    table: "leads",
    description: "Submissions from the contact form.",
    orderBy: { column: "created_at", ascending: false },
    listColumns: ["name", "email", "phone", "status", "created_at"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "company", label: "Company", type: "text" },
      { name: "service_interest", label: "Service interest", type: "text" },
      { name: "budget", label: "Budget", type: "text" },
      { name: "message", label: "Message", type: "textarea" },
      { name: "source", label: "Source", type: "text" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "New", value: "new" },
          { label: "Contacted", value: "contacted" },
          { label: "Qualified", value: "qualified" },
          { label: "Won", value: "won" },
          { label: "Lost", value: "lost" },
        ],
      },
    ],
  },
  {
    slug: "messages",
    label: "Messages",
    icon: MessagesSquare,
    table: "messages",
    description: "Messages sent via the floating WhatsApp widget.",
    orderBy: { column: "created_at", ascending: false },
    listColumns: ["name", "phone", "is_read", "created_at"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "message", label: "Message", type: "textarea", required: true },
      { name: "source", label: "Source", type: "text" },
      { name: "is_read", label: "Read", type: "boolean" },
    ],
  },
  {
    slug: "settings",
    label: "Site settings",
    icon: SettingsIcon,
    table: "site_settings",
    description: "Global site configuration (phone, WhatsApp, branding).",
    orderBy: { column: "key", ascending: true },
    listColumns: ["key"],
    fields: [
      { name: "key", label: "Key", type: "text", required: true },
      { name: "value", label: "Value (JSON)", type: "textarea", required: true, helperText: "Valid JSON object." },
    ],
  },
];

export function getModule(slug: string): ModuleConfig | undefined {
  return ADMIN_MODULES.find((m) => m.slug === slug);
}
