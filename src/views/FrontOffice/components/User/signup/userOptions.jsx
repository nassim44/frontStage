import { useState } from "react";
import SectionTitle from "../../../HomePage/components/Common/SectionTitle.jsx";
import OfferList from "../../../HomePage/components/Pricing/OfferList.jsx";
import PricingBox from "../../../HomePage/components/Pricing/PricingBox.jsx";
import { useNavigate } from "react-router-dom";
const UserOptions = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const navigate = useNavigate();
  const handleClickSimpleUser = () => {
    navigate("/signup", { state: { role: ["ROLE_USER"] } });
  };
  const handleClickFornissor = () => {
    navigate("/signup", { state: { role: ["ROLE_FOURNISSEUR"] } });
  };
  return (
    <section
      id="pricing"
      className="relative flex justify-center z-10 py-8"
    >
      <div className="container">
        <SectionTitle
          title={
            <>
              Welcome! <br /> Choose Your Role
            </>
          }
          paragraph="To tailor your registration process, please select the type of account that best describes you. Your choice will help us provide a more customized experience."
          center
          width="665px"
        />

        <div className="grid grid-cols-1 ml-30 mr-30  gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-2">
          <PricingBox
            packageName="I'm a Simple User"
            subtitle="
Effortlessly browse and purchase medical supplies. Enjoy a comprehensive set of tools tailored for clients."
          >
            <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
              <button
                onClick={handleClickSimpleUser}
                className="flex w-full items-center justify-center rounded-md bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
              >
                Sign Up Now
              </button>
            </div>
            <OfferList text="Browse and Search Products" status="active" />
            <OfferList text="View Product Details" status="active" />
            <OfferList text="Place Orders" status="active" />
            <OfferList
              text="Access Exclusive Offers and Discounts"
              status="active"
            />
            <OfferList text="Review and Rate Products" status="active" />
          </PricingBox>
          <PricingBox
            packageName="I'm a Fornissor"
            subtitle="Streamline your sales process and reach more customers. Access a powerful suite of tools designed for suppliers."
          >
            <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
              <button
                onClick={handleClickFornissor}
                className="flex w-full items-center justify-center rounded-md bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
              >
                Sign Up Now
              </button>
            </div>
            <OfferList text="List and Manage Products" status="active" />
            <OfferList text="Communicate with Clients" status="active" />
            <OfferList text="Manage Orders and Fulfillment" status="active" />
            <OfferList text="Set Shipping Options" status="active" />
            <OfferList
              text="Automate Inventory Replenishment"
              status="active"
            />
          </PricingBox>
        </div>
      </div>

      <div className="absolute left-0 bottom-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default UserOptions;
