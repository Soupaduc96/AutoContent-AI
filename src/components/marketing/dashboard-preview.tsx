export function DashboardPreview() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          
          <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <p className="text-sm text-zinc-400">
                Scheduled Posts
              </p>

              <h3 className="mt-3 text-4xl font-bold text-white">
                128
              </h3>

              <div className="mt-6 space-y-3">
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[80%] rounded-full bg-white" />
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[60%] rounded-full bg-purple-500" />
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[90%] rounded-full bg-blue-500" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 lg:col-span-2">
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">
                    AI Content Queue
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    Ready To Publish
                  </h3>
                </div>

                <div className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">
                  Active
                </div>
              </div>

              <div className="mt-8 space-y-4">
                
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="font-medium text-white">
                      TikTok Campaign
                    </p>

                    <p className="text-sm text-zinc-400">
                      Scheduled for 8:00 PM
                    </p>
                  </div>

                  <div className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300">
                    AI Generated
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="font-medium text-white">
                      Instagram Reels
                    </p>

                    <p className="text-sm text-zinc-400">
                      Scheduled for Tomorrow
                    </p>
                  </div>

                  <div className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300">
                    Processing
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}