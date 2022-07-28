import {createClient} from '@supabase/supabase-js';

export const supabase = createClient('https://hyvejtfnrltucuinvlsc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5dmVqdGZucmx0dWN1aW52bHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkwMjUzMzcsImV4cCI6MTk3NDYwMTMzN30.3tGq0qUkaRV87vlyYFZ4oGSOixiGBvOkbLmBL9qfkxE')

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