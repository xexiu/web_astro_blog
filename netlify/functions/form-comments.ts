// import * as dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';

// dotenv.config();

// // Create a single supabase client for interacting with your database
// const supabase = createClient(process.env.DATABASE as string, process.env.DATABASE_KEY as string);

// export const handler = async (event: any) => {
//    // De-structure the data from the request
//    const { email, name, last_name } = JSON.parse(event.body);

//    // We are expecting last_name to be empty
//    // If not, we've caught a bot!
//    if (last_name) {
//       return {
//          statusCode: 500,
//          body: JSON.stringify({
//             status: 500,
//             message: 'Honeypot triggered'
//          })
//       };
//    }

//    // Send the data to supabase
//    const { data, error } = await supabase
//       .from('comments')
//       .insert({ email, name });

//    return {
//       statusCode: 200,
//       body: JSON.stringify({
//          status: 200,
//          message: data,
//          error
//       })
//    };
// };