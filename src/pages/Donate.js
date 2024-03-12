import React from 'react';
import optimizedImage from '../assets/qrCode.png';
import Payment from '../components/Payment';

const DonationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-400 to-gray-200 text-gray-800">
      <section className="py-16 px-4 mx-auto max-w-7xl grid items-center grid-cols-1 md:grid-cols-2 gap-8 h-screen">
        <div className="text-scroll md:text-left overflow-auto max-h-full">
          <h2 className="text-4xl font-bold leading-tight mb-4">Hello! 👋 I'm Jenny Carter</h2>
          <p className="max-w-lg text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad modi doloremque sed nulla suscipit quas aspernatur libero dolore? Neque expedita illo atque. Mollitia quae corrupti consectetur dolor provident repellat!
          </p>
          <p className="mt-4 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus reiciendis, dolor alias commodi vero nobis repellat in exercitationem asperiores cum iste debitis, consequatur itaque ipsa tempora ipsum quaerat? Voluptate soluta, officiis iure facilis molestias maiores accusantium architecto consequuntur recusandae maxime! Animi sed hic velit assumenda deserunt recusandae voluptatem amet? Exercitationem, beatae delectus. Ut mollitia tenetur ea non odio amet dicta nobis alias similique! Sapiente enim quis iure molestiae provident qui. Earum, veniam iusto. Distinctio accusantium at, atque dicta, ex corrupti exercitationem ipsum placeat perferendis amet nesciunt illo voluptatem. Laudantium iure aliquam commodi fuga autem provident iusto voluptas deserunt repellendus recusandae perspiciatis distinctio pariatur, accusamus tempore, suscipit eligendi nemo, saepe doloremque? Similique nam, beatae voluptate facere modi rerum porro quae accusamus ipsum. Tempora, cumque. In nesciunt ea laborum debitis consectetur veniam, ab doloribus! Cupiditate minima laborum ab similique corporis libero voluptate, explicabo aspernatur eius! Quas voluptates ab blanditiis error autem placeat minima saepe architecto molestias aspernatur earum aperiam laborum hic voluptas iusto, sit sed odio! Reiciendis maxime adipisci qui dolores accusantium minima, odit suscipit blanditiis architecto quod quidem iure molestias veritatis deleniti saepe mollitia. Blanditiis similique modi sequi error ducimus. Voluptas, ab error totam provident quo ex ipsam laudantium odit dicta. Quia, inventore asperiores! Sit quos autem esse libero, cumque praesentium dolore suscipit quis maxime expedita illum nostrum sequi excepturi dolor repudiandae numquam iste atque quam aperiam! Numquam assumenda perspiciatis ipsum, non iure voluptatum tenetur quo sapiente quisquam voluptatibus? Sint in facilis illum numquam laboriosam iure suscipit praesentium, voluptatem dignissimos optio totam qui illo culpa a quam aperiam adipisci vel atque quo! Ullam quos asperiores praesentium dicta numquam, animi tenetur suscipit eaque laboriosam illo officia nesciunt facilis commodi nulla non voluptate voluptas architecto dolorem eum qui aut aliquam repudiandae maiores quis. Provident dolorum alias cumque molestias incidunt aspernatur, ipsam necessitatibus eius quae culpa amet numquam officiis architecto. Officiis pariatur doloribus minima sint rem? Dolores quas maxime, sequi perspiciatis debitis ipsa quos excepturi! Accusamus tempora iste animi, in totam facere dolorem suscipit id quis inventore laudantium reiciendis quaerat porro soluta. Voluptatibus similique ipsam aliquid repudiandae dolores exercitationem vero omnis maiores pariatur autem debitis laboriosam, minus quibusdam quam, nam aliquam dolore? Similique voluptatum laboriosam suscipit, pariatur autem maxime nostrum deleniti numquam vero saepe quae nesciunt. Totam dicta cupiditate tenetur sed ipsa sequi at aliquam, quis maiores beatae vero deleniti consectetur soluta quos. Veritatis placeat aut ducimus reiciendis ipsum! Perferendis accusamus recusandae voluptatum et ipsam commodi illum vero eius quos eligendi, ad quas sapiente maiores fugit inventore magni consequatur qui cupiditate ipsum? Iste possimus quaerat ab quo aspernatur unde illum totam alias accusamus! Sapiente optio nihil quis excepturi, praesentium ea at repellat ipsa molestiae quae architecto reiciendis neque recusandae, exercitationem iste ullam culpa pariatur perferendis tempore voluptates fugit odit? Totam reiciendis tempore illum nulla velit. Odit perferendis vitae aliquam neque esse voluptatibus dicta, porro iusto numquam odio. Voluptates eveniet ex assumenda ipsam vel excepturi, fuga necessitatibus et debitis omnis, iste exercitationem natus maxime totam. Excepturi architecto ipsa quis asperiores minima ipsam quo, at quaerat!
          </p>
        </div>
        <div className="bg-white p-8 rounded-md shadow-lg text-gray-800 fixed right-0 top-0 md:static md:mr-0 md:w-full overflow-auto max-h-full">
          <p className="text-2xl font-bold mb-2 text-purple-500">Scan to Donate</p>
          <p className="text-lg mb-4">Your generous support keeps us going!</p>
          <div className="flex justify-center mb-6">
            <img className="w-full max-w-md mx-auto shadow-2xl rounded-md" src={optimizedImage} alt="QR Code" />
          </div>
          <div className='flex justify-center items-center'>
            <Payment/>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="btn-primary">Thank you!</button>
            <button className="btn-secondary">Support Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationPage;
