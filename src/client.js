import { createClient } from '@supabase/supabase-js'

const URL = 'https://vcttdjkmmfekjrknpimw.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjdHRkamttbWZla2pya25waW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MTUwMzMsImV4cCI6MjAyODk5MTAzM30.SMzF4DaUWGPknsZYCGWkWXCHqoZI7lBR-1bxz960BJA';

export const supabase = createClient(URL, API_KEY);