import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Card } from '@sugaming/sugaming-ui/lib/components/common/server';
import { RegulationItem } from '@sugaming/sugaming-ui/lib/components/site/regulation-item/regulation-item';
import { Logo } from '@sugaming/sugaming-ui/lib/components/site/logo/logo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('regulations-page');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function RegulationsPage() {
  const t = useTranslations('regulations-page');

  const regulations = [
    {
      title: 'Какво е SUGAMING?',
      content: (
        <p>
          SUGAMING е официалният клуб по игра и разработка на видеоигри към
          Софийски университет &quot;Св. Климент Охридски&quot;. Нашият клуб се
          състои от 2 части - Game Development и Gaming Tournaments, като идеята
          е любителите на видеоигри да могат да се насладят и на двете,
          изграждайки една активна общност.
        </p>
      ),
    },
    {
      title: 'Какво да очаквате в SUGAMING?',
      content: (
        <p>
          Подготвили сме ви лекции по разработка на видеоигри, семинари и
          най-голямото Game Development събитие, което ще се проведе на
          територията на СУ - Game Jam!
          <br />
          Също така очаквайте летни и есенни турнири на любимите си игри! Като
          ще започнем с League of Legends и CS2, a в последствие ще добавяме и
          още!
          <br />
          Ако някога сте си търсили компания, с която да играете любимите си
          игри, то SUGAMING може да ви помогне и за това! Присъединявайки се към
          клуба, вие ще получите достъп към нашия Discord Server, където ще
          можете да намерите хора с различни интереси, да следите новините за
          клуба и да участвате в различни дейности и game sessions.
        </p>
      ),
    },
    {
      title: 'Политика за бисквитки и поверителност',
      content: (
        <>
          <p>
            За да подобрим представянето на уеб сайта си и Вашето потребителско
            преживяване, понякога използваме HTTP-бисквитки (HTTP cookies), или
            просто бисквитки. С използването на сайта Вие се съгласявате с това.
          </p>
          <ul className="list-disc list-inside">
            <li>
              Какво представляват бисквитките?
              <p>
                Бисквитките са малки текстови файлове, които се запазват на
                Вашия компютър или мобилно устройство, когато посещавате нашия
                уеб сайт. Те позволяват на уеб сайта да запаметява Вашите
                действия и предпочитания, за определен период от време, за да не
                се налага да ги въвеждате всеки път, когато посещавате сайта или
                преминавате от една страница към друга, което ни помага да Ви
                предоставяме съдържание, което смятаме, че ще бъде полезно и
                интересно за Вас.
              </p>
            </li>
            <li>
              Как и какви бисквитки използваме?
              <ol className="list-disc list-inside pl-4">
                <li>
                  Функционални бисквитки
                  <p>
                    Използваме бисквитки, които позволяват на уеб сайта да
                    запаметява Вашите действия и предпочитания (като например
                    потребителско име, език, възраст, размер на шрифта и други
                    настройки за показване) за определен период от време, за да
                    не се налага да ги въвеждате всеки път, когато посещавате
                    сайта или преминавате от една страница към друга.
                  </p>
                </li>
                <li>
                  Бисквитки за сигурност
                  <p>
                    Използваме бисквитки от гледна точка на сигурност, чиято цел
                    е да предотвратяват измамническо използване на
                    идентификационни данни за вход, както и за защита
                    информацията от неупълномощени страни.
                  </p>
                </li>
                <li>
                  Лични данни от бисквитките
                  <p>
                    Личните данни събрани от бисквитките се използват единствено
                    и само за осъществяването на конкретни функции в сайта,
                    свързани със самия потребител.
                  </p>
                </li>
              </ol>
            </li>

            <li>
              Поверителност
              <p>
                Чрез регистрация във FMI{'{Codes}'} Вие се съгласявате с нашата
                политика за поверителност. FMI{'{Codes}'} не предоставя Вашите
                данни на трети лица. Вашите данни не се използват за
                персонализация. Всичките данни, които сте предоставили на FMI
                {'{Codes}'}, се използват единствено за организацията на
                събитието от организационния екип.
              </p>
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase my-4 truncate text-clip">
        {t('title')}
      </h1>

      <Card className="px-4">
        {regulations.map((regulation) => (
          <RegulationItem
            key={regulation.title}
            title={regulation.title}
            content={regulation.content}
          />
        ))}

        <p className="text-xl py-4 text-center">
          Организаторите на SUGAMING се надяваме да се забавлявате в нашия клуб.
          За допълнителни въпроси може да се свържете с нас по всички социални
          мрежи.
        </p>
      </Card>
    </>
  );
}