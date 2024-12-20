import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs';
import { Blocks, Code, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import RunButton from '@/components/RunButton';
import HeaderProfileButton from '@/components/HeaderProfileButton';
import ThemeSelector from '@/components/ThemeSelector';
import LanguageSelector from '@/components/LanguageSelector';
import { api } from '../../../../convex/_generated/api';

const Header = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();
  
  const convexUser = await convex.query(
    api.users.getUser, {
      userId: user?.id || "",
    }
  );

  return (
    <header className="w-full bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 py-4 px-2 overflow-hidden sticky top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 opacity-50 animate-gradient" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="group relative flex items-center">
            <Link href="/">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-slate-900/50">
                <Blocks className="size-7 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-all duration-500 group-hover:scale-110" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                  PurrFect IDE
                </span>
              </div>
            </Link>
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-300" />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="relative group bg-slate-900/10 hover:bg-slate-800/50 text-slate-300 hover:text-purple-300 transition-all duration-300"
            >
              <Link href="/snippets" className="flex items-center gap-2 px-4">
                <Code className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-medium">Snippets</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300" />
              </Link>
            </Button>

            <Separator orientation="vertical" className="h-6 bg-slate-700/50" />

            {/* Theme and Language Controls */}
            <div className="flex items-center gap-4 px-2 py-1 rounded-lg bg-slate-900/30">
              <ThemeSelector />
            </div>

            <Separator orientation="vertical" className="h-6 bg-slate-700/50" />

            <div className="flex items-center gap-4 px-2 py-1 rounded-lg bg-slate-900/30">
              <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
            </div>

            <Separator orientation="vertical" className="h-6 bg-slate-700/50" />

            {/* Pricing Link for Non-Pro Users */}
            {!convexUser?.isPro && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="relative group bg-slate-900/10 hover:bg-slate-800/50 text-slate-300 hover:text-pink-300 transition-all duration-300"
              >
                <Link href="/pricing" className="flex items-center gap-2 px-4">
                  <Crown className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Upgrade</span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300" />
                </Link>
              </Button>
            )}

            {/* Run Button for Signed In Users */}
            <SignedIn>
              <RunButton />
            </SignedIn>

            {/* Profile Button */}
            <HeaderProfileButton />
          </div>
        </div>
      </div>

      {/* Enhanced Background Glow Effects */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-32 h-32 bg-purple-500/5 rounded-full blur-xl animate-pulse"
          style={{
            right: `${i * 30}%`,
            top: `${i * 20}%`,
            opacity: 0.15 * (i + 1),
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </header>
  );
};

export default Header;