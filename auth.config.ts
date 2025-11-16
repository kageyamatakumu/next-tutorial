import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true; // ① ダッシュボードにアクセスした × ログイン済 → 通過
        return false; // ② ダッシュボードにアクセスした × 未ログイン → アクセス拒否（login へ）
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl)); // ③ ログイン済のユーザーがトップページ /login に来た → 自動で /dashboard へ
      }
      return true; // ④ その他は全て通過
    },
  },
  providers: [], // Add providers(認証プロバイダ（GitHub、Google、Credentials）) with an empty array for now
} satisfies NextAuthConfig;