import React from "react";
import Wrapper from "./Wrapper";


const Hero = () => {
  return (
    <div className="w-full md:py-8">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[50px]">
          <div className="left pt-3 w-full md:w-auto flex-[1.5] max-w-[400px] lg:w-[400px] lg:h-[400px] mx-auto lg:mx-0">
            <img
              className="rounded-[10px]"
              src="https://img.freepik.com/free-photo/headphones-with-minimalist-monochrome-background_23-2150763315.jpg?t=st=1708548503~exp=1708552103~hmac=7aa3127b62e5164f617963f3f13494e3a0cfcfdf70ab6300cf103acbacb379e5&w=826"
              alt=""
            />
          </div>

          <div className="right flex-[1] ">
            {/* PRODUCT TITLE */}
            <div className="text-[34px] font-semibold mb-2">
              GenAI Collective 🐰 Design Buddies 🚀Ansh Mehra 🧠 The GenAI 🤝
              Design Workshop You've All Been Waiting For
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-lg font-semibold mb-5">
              Men&apos;s Golf Shoes
            </div>

            {/* PRODUCT PRICE */}
            <div className="text-lg font-semibold">MRP : $ 19 695.00</div>
            <div className="text-md font-medium text-black/[0.5]">
              incl.of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5]">
              {`(Also includes all applicable duties)`}
            </div>

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                The details that you provide for a product affect the way that
                the product is displayed to customers, make it easier for you to
                organize your products, and help customers find the product. You
                don't have to provide every detail for each product. For
                products that don't have any variants, the Pricing, Inventory,
                and Shipping sections are shown on the product details page. If
                you add variants, then those sections are no longer shown on the
                product details page.
              </div>
              {/* <div className="markdown text-md mb-5">
                To change the details for product variants, refer to Editing
                variants for an existing product. If you want to save
                specialized information or files for your products, then you can
                add custom fields to your product pages by using metafields. If
                you have an Online Store 2.0 theme, such as Dawn, then you can
                use the theme editor to connect metafields to your theme and
                customize your pages to the product or variant that's displayed.
              </div> */}
            </div>

            <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
              Enroll Now
            </button>

            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Whishlist
            </button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
