import {createClient} from '@supabase/supabase-js';

const CLIENT_URL = process.env.NODE_ENV === 'production' ? 
										'https://hbiqbvghlbzeybwyxsjs.supabase.co':
										'https://hyvejtfnrltucuinvlsc.supabase.co';
const ANON_KEY = process.env.NODE_ENV === 'production' ?
										 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiaXFidmdobGJ6ZXlid3l4c2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkwNjYwMTYsImV4cCI6MTk3NDY0MjAxNn0.4c3XCoAt4a7lYzVJVnVB7PZSkc2lH5gQXZpy91Q5xrY':
										 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5dmVqdGZucmx0dWN1aW52bHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkwMjUzMzcsImV4cCI6MTk3NDYwMTMzN30.3tGq0qUkaRV87vlyYFZ4oGSOixiGBvOkbLmBL9qfkxE';
export const supabase = createClient(CLIENT_URL, ANON_KEY)

export async function signout() {
	const { error } = await supabase.auth.signOut();
	console.log(error);
};
export async function signInWithGithub() {
	const { user, session, error } = await supabase.auth.signIn({
		provider: 'github',
	});
	console.log(user, session, error);
};