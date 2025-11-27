export default function CardItem({ title, tag, rating }) {
  return (
    <div className="bg-white shadow-lg p-4 rounded-xl text-center">
      <div className="w-12 h-12 bg-gray-200 rounded-xl mx-auto mb-3"></div>
      <h4 className="text-sm font-bold">{title}</h4>
      <p className="text-xs text-gray-500">{tag}</p>
      <p className="text-xs mt-2 text-blue-600">⭐ {rating}</p>
    </div>
  );
}
