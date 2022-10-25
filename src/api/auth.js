import {createClient} from '@supabase/supabase-js';
import {ANON_KEY, CLIENT_URL} from "../constants/global";

export const supabase = createClient(CLIENT_URL, ANON_KEY);

export async function signOut() {
	const { error } = await supabase.auth.signOut();
	console.log(error);
}

export async function signInWithGithub() {
	const { user, session, error } = await supabase.auth.signIn({
		provider: 'github',
	});
	console.log(user, session, error);
}