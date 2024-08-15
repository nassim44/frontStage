import { useEffect, useState } from "react";

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const Testimonial = (prop) => {
  const productImage = "http://127.0.0.1:8000/uploads";
  const [Role, setRole] = useState("");
  let ratingIcons = [];
  for (let index = 0; index < prop.testimonial.Stars; index++) {
    ratingIcons.push(
      <span key={index} className="text-yellow">
        {starIcon}
      </span>
    );
  }
  useEffect(() => {
    if (prop.testimonial.user.roles) {
      if (prop.testimonial.user.roles.includes("ROLE_FOURNISSEUR")) {
        setRole("Fournisseur");
      } else {
        setRole("Client");
      }
    }
  }, [prop.testimonial]);
  return (
    <div className="w-full">
      <div
        className="wow fadeInUp rounded-md bg-white p-8 shadow-one dark:bg-[#1D2144] lg:px-5 xl:px-8"
        data-wow-delay=".1s"
      >
        <div className="flex items-center justify-between">
          <div className="mb-5 flex items-center space-x-1">{ratingIcons}</div>
          <div className="mb-5 flex items-center space-x-1 text-xs">
            {formatDate(prop.testimonial.CreatedAt)}
          </div>
        </div>
        <p className="mb-8 border-b border-body-color border-opacity-10 pb-8 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white">
          “{prop.testimonial.Review}
        </p>
        <div className="flex items-center">
          <div className="relative mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
            <img src={productImage + prop.testimonial.user.profileImage} />
          </div>
          <div className="w-full">
            <h5 className="mb-1 text-lg font-semibold text-dark dark:text-white lg:text-base xl:text-lg">
              {prop.testimonial.user.LastName.charAt(0).toUpperCase() +
                prop.testimonial.user.LastName.slice(1).toLowerCase()}{" "}
              {prop.testimonial.user.FirstName.charAt(0).toUpperCase() +
                prop.testimonial.user.FirstName.slice(1).toLowerCase()}
            </h5>
            <p className="text-sm text-body-color">{Role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
export default Testimonial;
