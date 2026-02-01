"use client";
import Link from "next/link";
import { useState } from "react";

const NOTIFICATIONS = [
  {
    id: "1",
    name: "Reminder - Complete scoring for missing 2 members",
    channel: "push",
    schedule: "Recurring",
    scheduleDetail: "Weekly Friday @ 10 AM",
    audienceScope: "Users with pending ratings",
    reach: 145,
    sent: 145,
    engagement: 92,
    status: "Active",
    enabled: true,
  },
  {
    id: "2",
    name: "Member Performance Alert - Sarah's performance down for 3 weeks",
    channel: "push",
    schedule: "Recurring",
    scheduleDetail: "Every 3rd Wednesday",
    audienceScope: "Users with negative trend",
    reach: 12,
    sent: 12,
    engagement: 12,
    status: "Active",
    enabled: true,
  },
  {
    id: "3",
    name: "Reminder - Generate performance review",
    channel: "push",
    schedule: "Recurring",
    scheduleDetail: "Every 3 months",
    audienceScope: "All active users",
    reach: 850,
    sent: 0,
    engagement: 0,
    status: "Scheduled",
    enabled: true,
  },
  {
    id: "4",
    name: "Team performance alert - Engineering performing 4+ rating",
    channel: "push",
    schedule: "Recurring",
    scheduleDetail: "Weekly Friday @ 4 PM",
    audienceScope: "Users in teams with performance > 4",
    reach: 42,
    sent: 42,
    engagement: 38,
    status: "Active",
    enabled: true,
  },
  {
    id: "5",
    name: "Reminder - Regular Performance Sync",
    channel: "push",
    schedule: "Scheduled",
    scheduleDetail: "Fortnightly (Every 2 weeks)",
    audienceScope: "All active users",
    reach: 28,
    sent: 14,
    engagement: 14,
    status: "Active",
    enabled: true,
  },
  {
    id: "6",
    name: "Monthly Culture Survey Link",
    channel: "email",
    schedule: "Recurring",
    scheduleDetail: "1st of every month",
    audienceScope: "All active users",
    reach: 5200,
    sent: 5200,
    engagement: 3100,
    status: "Active",
    enabled: true,
  },
  {
    id: "7",
    name: "System Maintenance: Performance Module",
    channel: "whatsapp",
    schedule: "Scheduled",
    scheduleDetail: "Feb 15, 11:00 PM",
    audienceScope: "All active users",
    reach: 15,
    sent: 0,
    engagement: 0,
    status: "Scheduled",
    enabled: true,
  },
  {
    id: "8",
    name: "Q1 Bonus Policy Update",
    channel: "banner",
    schedule: "Instant",
    scheduleDetail: "Sent Jan 31",
    audienceScope: "All active users",
    reach: 4800,
    sent: 4800,
    engagement: 4200,
    status: "Completed",
    enabled: true,
  },
  {
    id: "9",
    name: "Upcoming Peer Feedback Deadline",
    channel: "message",
    schedule: "Recurring",
    scheduleDetail: "Daily until deadline",
    audienceScope: "Users with pending feedback > 0",
    reach: 120,
    sent: 115,
    engagement: 88,
    status: "Active",
    enabled: true,
  },
];

function Toggle({ initialEnabled }: { initialEnabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
        enabled ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'push': return "📱";
    case 'email': return "📧";
    case 'whatsapp': return "💬";
    case 'banner': return "🏁";
    case 'message': return "📥";
    default: return "🔔";
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] font-sans text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className=" rounded-lg bg-indigo-600 flex items-center justify-center px-2 py-1">
              <span className="text-white font-bold text-lg">JustScore</span>
            </div>
            <h1 className="text-md font-bold tracking-tight text-slate-900 dark:text-white">
              Notification Center
            </h1>
          </div>
          <Link 
            href="/notifications/create"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Notification
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Notification Report</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Real-time delivery stats and performance metrics across all channels.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg dark:bg-white/5 dark:border-slate-800">
              Export CSV
            </button>
            <button className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg dark:bg-white/5 dark:border-slate-800 text-indigo-600">
              Refresh Data
            </button>
          </div>
        </div>

        {/* Table/Report Container */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111111]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 border-b border-slate-200 dark:bg-[#1A1A1A] dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                <tr>
                  <th className="px-6 py-4">Notification</th>
                  <th className="px-6 py-4">Delivery Schedule</th>
                  <th className="px-6 py-4">Audience Scope</th>
                  <th className="px-6 py-4">Total Reach</th>
                  <th className="px-6 py-4">Engagement</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right whitespace-nowrap">Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {NOTIFICATIONS.map((n) => (
                  <tr
                    key={n.id}
                    className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-lg dark:bg-white/5">
                          {getChannelIcon(n.channel)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{n.name}</div>
                          <div className="text-[10px] text-slate-400 capitalize">{n.channel} notification</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-700 dark:text-slate-300">{n.schedule}</div>
                      <div className="text-[10px] text-slate-400">{n.scheduleDetail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded w-fit">
                        {n.audienceScope}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{n.reach.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400">Targeted Users</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{(n.reach > 0 ? (n.sent / n.reach * 100).toFixed(0) : 0)}%</div>
                          <div className="text-[10px] text-slate-400">Sent</div>
                        </div>
                        <div>
                          <div className="font-bold text-indigo-600 dark:text-indigo-400">{(n.reach > 0 ? (n.engagement / n.reach * 100).toFixed(1) : 0)}%</div>
                          <div className="text-[10px] text-slate-400">CTR</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        n.status === 'Sent' || n.status === 'Completed' ? 'text-green-600 bg-green-50 dark:bg-green-500/10' :
                        n.status === 'Active' ? 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 animate-pulse' :
                        'text-orange-600 bg-orange-50 dark:bg-orange-500/10'
                      }`}>
                        <div className={`h-1 w-1 rounded-full ${
                          n.status === 'Sent' || n.status === 'Completed' ? 'bg-green-600' :
                          n.status === 'Active' ? 'bg-blue-600' : 'bg-orange-600'
                        }`} />
                        {n.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Toggle initialEnabled={n.enabled} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Footer of the table for pagination if needed (visual only) */}
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
            <p className="text-xs text-slate-500">Showing 5 of 5 records</p>
            <div className="flex gap-2">
              <button className="rounded border border-slate-200 px-2 py-1 text-xs font-medium text-slate-400 cursor-not-allowed dark:border-slate-800">
                Prev
              </button>
              <button className="rounded border border-slate-200 px-2 py-1 text-xs font-medium text-slate-400 cursor-not-allowed dark:border-slate-800">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
