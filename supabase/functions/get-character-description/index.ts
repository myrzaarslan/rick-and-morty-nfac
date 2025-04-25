import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { Configuration, OpenAIApi } from 'npm:openai@4.24.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { character } = await req.json();

    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    const prompt = `Опишите персонажа "${character.name}" из мультсериала "Рик и Морти". Используйте следующую информацию:
    - Статус: ${character.status}
    - Вид: ${character.species}
    - Тип: ${character.type || 'Не указан'}
    - Пол: ${character.gender}
    - Происхождение: ${character.origin.name}
    - Текущее местоположение: ${character.location.name}
    
    Дайте краткое, но интересное описание персонажа в пределах 2-3 предложений. Включите любые известные факты или особенности.`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Вы - эксперт по вселенной "Рика и Морти", который предоставляет точную и увлекательную информацию о персонажах шоу.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const description = completion.data.choices[0]?.message?.content || 'Описание недоступно';

    return new Response(
      JSON.stringify({ description }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate character description' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});