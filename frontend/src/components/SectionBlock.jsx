import CardItem from "./CardItem";

export default function SectionBlock({ title, data }) {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center px-2">
        <h3 className="font-semibold text-sm">{title}</h3>
        <span className="text-xs text-blue-500 cursor-pointer">View All</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {data.map((item, index) => (
          <CardItem key={index} title={item.name} tag={item.tag} rating={item.rating} />
        ))}
      </div>
    </div>
  );
}
