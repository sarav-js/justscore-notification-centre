"use client";

import Link from "next/link";
import { useState } from "react";

type ChannelType = "push" | "email" | "whatsapp" | "banner" | "message";

export default function CreateNotificationPage() {
  const [channel, setChannel] = useState<ChannelType>("push");
  const [scheduleType, setScheduleType] = useState("instant");
  const [audienceType, setAudienceType] = useState("all");
  const [filters, setFilters] = useState<{ id: number; category: string; operator: string; value: string }[]>([
    { id: 1, category: "Team", operator: "is", value: "Engineering" }
  ]);

  const addFilter = () => {
    setFilters([...filters, { id: Date.now(), category: "Scores Given", operator: "greater than", value: "10" }]);
  };

  const removeFilter = (id: number) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const channels: { id: ChannelType; label: string; icon: string }[] = [
    { id: "push", label: "Push", icon: "📱" },
    { id: "email", label: "Email", icon: "📧" },
    { id: "whatsapp", label: "WhatsApp", icon: "💬" },
    { id: "banner", label: "Banner", icon: "🏁" },
    { id: "message", label: "In-App", icon: "📥" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] font-sans text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-black dark:hover:bg-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-600 transition-transform group-hover:-translate-x-0.5 dark:text-slate-400"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Create Notification
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5">
              Save Draft
            </button>
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95">
              {scheduleType === 'instant' ? 'Send Now' : scheduleType === 'scheduled' ? 'Schedule Notification' : 'Activate Recurring'}
            </button>
          </div>
        </div>
      </header>

      {/* Channel Selector */}
      <div className="bg-white border-b border-slate-200 dark:bg-[#111111] dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-2 scrollbar-none">
            {channels.map((c) => (
              <button
                key={c.id}
                onClick={() => setChannel(c.id)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-all ${
                  channel === c.id
                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <span>{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Info */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111111]">
              <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Notification Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Internal Notification Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Flash Sale Jan 2026"
                    className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-focus focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-white/5 dark:focus:border-indigo-500 dark:focus:bg-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Dynamic Content Section */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111111]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Message Content</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded dark:bg-indigo-500/10 dark:text-indigo-400">
                  {channel}
                </span>
              </div>
              
              <div className="space-y-6">
                {/* Push / Banner / Message Common Fields */}
                {(channel === 'push' || channel === 'banner' || channel === 'message') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter notification title"
                        className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Body
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Type your message here..."
                        className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                      />
                    </div>
                  </>
                )}

                {/* Email Specific Fields */}
                {channel === 'email' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        placeholder="Email subject"
                        className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          From Name
                        </label>
                        <input
                          type="text"
                          placeholder="Justscore Support"
                          className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          From Email
                        </label>
                        <input
                          type="email"
                          placeholder="noreply@justscore.com"
                          className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        HTML Content
                      </label>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-white/5 min-h-[150px]">
                        <span className="text-blue-500">&lt;html&gt;</span><br/>
                        <span className="pl-4 text-blue-500">&lt;body&gt;</span><br/>
                        <span className="pl-8 text-slate-400">Your email content goes here...</span><br/>
                        <span className="pl-4 text-blue-500">&lt;/body&gt;</span><br/>
                        <span className="text-blue-500">&lt;/html&gt;</span>
                      </div>
                    </div>
                  </>
                )}

                {/* WhatsApp Specific Fields */}
                {channel === 'whatsapp' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Template Name
                      </label>
                      <select className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5">
                        <option>order_confirmation</option>
                        <option>shipping_update</option>
                        <option>welcome_message</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Template Parameters (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe, ORD-123, $99.99"
                        className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Media URL (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="https://cdn.example.com/receipt.pdf"
                        className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                      />
                    </div>
                  </>
                )}

                {/* Banner/Message specific */}
                {(channel === 'banner' || channel === 'message') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Image URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://..."
                        className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Action URL
                      </label>
                      <input
                        type="text"
                        placeholder="myapp://settings"
                        className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                      />
                    </div>
                  </div>
                )}
                
                {/* Advanced Fields Link */}
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  + Add Metadata / Advanced Fields
                </button>
              </div>
            </section>

            {/* Audience Section */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111111]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Audience Targeting</h3>
                {audienceType === 'filter' && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">Estimated Reach:</span>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">1,250 Users</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "all", label: "All Users", sub: "Whole base" },
                    { id: "filter", label: "Filter", sub: "Rules" },
                    { id: "individual", label: "Individual", sub: "Direct ID" }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setAudienceType(type.id)}
                      className={`flex h-20 flex-col items-center justify-center rounded-lg border p-3 text-center transition-all ${
                        audienceType === type.id
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-black dark:text-slate-400 dark:hover:bg-white/5"
                      }`}
                    >
                      <span className="text-xs font-bold">{type.label}</span>
                      <span className="mt-1 text-[10px] opacity-70">{type.sub}</span>
                    </button>
                  ))}
                </div>

                {audienceType === "filter" && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Targeting Rules (AND)</label>
                      <button 
                        onClick={addFilter}
                        className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        + Add Rule
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {filters.map((filter) => (
                        <div key={filter.id} className="group relative flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/50 p-2 dark:border-slate-800 dark:bg-white/[0.02]">
                          <select className="bg-transparent text-xs font-semibold focus:outline-none dark:text-slate-300">
                            <option>Team</option>
                            <option>Organization</option>
                            <option>Created Date</option>
                            <option>Scores Given</option>
                            <option>Last Active</option>
                            <option>Performance</option>
                          </select>
                          <select className="bg-transparent text-xs text-slate-500 focus:outline-none">
                            <option>{filter.operator}</option>
                            <option>is not</option>
                            <option>starts with</option>
                            <option>greater than</option>
                            <option>less than</option>
                          </select>
                          <input 
                            type="text" 
                            defaultValue={filter.value}
                            className="flex-1 bg-transparent text-xs font-medium focus:outline-none dark:text-white" 
                          />
                          <button 
                            onClick={() => removeFilter(filter.id)}
                            className="opacity-0 group-hover:opacity-100 ml-2 p-1 text-slate-400 hover:text-red-500 transition-all"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {audienceType === "individual" && (
                  <div className="animate-in fade-in slide-in-from-top-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Recipient IDs / Tokens
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Comma separated user IDs or tokens..."
                      className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                    />
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Side */}
          <div className="space-y-6">
            {/* Scheduling Info */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111111]">
              <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Delivery Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Schedule
                  </label>
                  <select
                    value={scheduleType}
                    onChange={(e) => setScheduleType(e.target.value)}
                    className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                  >
                    <option value="instant">Send Instantly</option>
                    <option value="scheduled">Scheduled Date</option>
                    <option value="recurring">Recurring (Cron)</option>
                  </select>
                </div>

                {scheduleType === 'scheduled' && (
                  <div className="animate-in fade-in slide-in-from-top-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Send Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                    />
                  </div>
                )}

                {scheduleType === 'recurring' && (
                  <div className="animate-in fade-in slide-in-from-top-1 space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Cron Expression
                      </label>
                      <input
                        type="text"
                        placeholder="0 9 * * MON"
                        className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-mono focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-white/5"
                      />
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 text-[10px] text-slate-500 dark:bg-white/5">
                      <p className="font-bold text-indigo-600 dark:text-indigo-400">Next Runs:</p>
                      <p>• Monday, Feb 2nd at 9:00 AM</p>
                      <p>• Monday, Feb 9th at 9:00 AM</p>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Priority
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Critical", "High", "Normal", "Low"].map((p) => (
                      <button
                        key={p}
                        className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase transition-all ${
                          p === 'Normal' 
                            ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:border-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400" 
                            : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-black dark:text-slate-500"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Enabled</span>
                  <button className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 focus:outline-none">
                    <span className="translate-x-4 pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200"></span>
                  </button>
                </div>
              </div>
            </section>

            {/* Preview Mockup */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111111]">
              <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Channel Preview</h3>
              
              <div className="relative mx-auto min-h-[260px] w-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/[0.02]">
                {channel === 'push' && (
                  <div className="w-full max-w-[200px] rounded-xl bg-white shadow-lg border border-slate-100 p-3 dark:bg-slate-800 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-4 w-4 rounded-full bg-indigo-600"></div>
                      <span className="text-[10px] font-bold text-slate-900 dark:text-white capitalize">App Name</span>
                      <span className="text-[10px] text-slate-400 ml-auto">now</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Update Available</div>
                    <div className="text-[11px] leading-snug text-slate-600 dark:text-slate-400">Tap to see what's new in this version.</div>
                  </div>
                )}

                {channel === 'email' && (
                  <div className="w-full bg-white border border-slate-100 shadow-sm p-4 text-center dark:bg-slate-800 dark:border-slate-700">
                    <div className="h-6 w-16 mx-auto bg-slate-100 dark:bg-slate-700 rounded mb-4"></div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mb-2 underline decoration-indigo-500">Subject Preview</div>
                    <div className="space-y-1.5 opacity-50">
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded"></div>
                      <div className="h-2 w-[80%] bg-slate-100 dark:bg-slate-700 rounded mx-auto"></div>
                    </div>
                    <div className="mt-4 h-6 w-20 bg-indigo-600 rounded mx-auto"></div>
                  </div>
                )}

                {channel === 'whatsapp' && (
                  <div className="w-full max-w-[200px] bg-[#E5DDD5] rounded-lg p-3 dark:bg-[#0b141a]">
                    <div className="bg-white rounded-lg p-2.5 shadow-sm dark:bg-[#1f2c33]">
                      <div className="text-[11px] text-slate-900 dark:text-white">
                        <span className="font-bold">Order Confirmed!</span><br/>
                        Hi John, your order ORD-123 has been received...
                      </div>
                      <div className="mt-1 text-[9px] text-slate-400 text-right uppercase">10:45 AM</div>
                    </div>
                  </div>
                )}

                {(channel === 'banner' || channel === 'message') && (
                  <div className="w-full h-32 rounded-lg bg-indigo-600 flex flex-col justify-end p-4 relative overflow-hidden">
                    <div className="absolute top-4 right-4 h-4 w-4 rounded-full bg-white/20"></div>
                    <div className="text-white font-bold text-sm">Sale Banner</div>
                    <div className="text-white/80 text-[10px]">50% OFF Storewide</div>
                  </div>
                )}

                <p className="mt-4 text-[10px] text-slate-400">Live preview (mock)</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
