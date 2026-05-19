import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchTutors,
} from "../features/booking/bookingSlice";

import TutorCard from "../components/TutorCard";

import BookingModal from "../components/BookingModal";

import {
  FaChalkboardTeacher,
  FaSearch,
  FaStar,
  FaUserGraduate,
} from "react-icons/fa";

const Tutors = () => {
  const dispatch = useDispatch();

  const { tutors = [] } =
    useSelector(
      (state) =>
        state.booking || {}
    );

  const [
    selectedTutor,
    setSelectedTutor,
  ] = useState(null);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    dispatch(fetchTutors());
  }, [dispatch]);

  const filteredTutors =
    useMemo(() => {
      return tutors.filter(
        (tutor) =>
          tutor.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          tutor.subject
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [tutors, search]);

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      {/* HERO */}
      <div className="border-b border-white/10 bg-linear-to-b from-blue-500/10 to-transparent">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                <FaChalkboardTeacher />

                Learn from verified tutors
              </div>

              <h1 className="text-5xl font-black leading-tight tracking-tight">
                Tutor Marketplace
              </h1>

              <p className="mt-5 text-lg leading-8 text-gray-400">
                Connect with expert tutors,
                schedule personalized study
                sessions, and accelerate your
                learning journey with
                StudySync.
              </p>
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/15 text-2xl text-blue-400">
                  <FaUserGraduate />
                </div>

                <h2 className="mt-4 text-3xl font-black">
                  {tutors.length}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Active Tutors
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/15 text-2xl text-yellow-400">
                  <FaStar />
                </div>

                <h2 className="mt-4 text-3xl font-black">
                  4.9
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Average Rating
                </p>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="relative mt-10">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              placeholder="Search tutors by name or subject..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full rounded-3xl border border-white/10 bg-white/5 py-5 pl-14 pr-5 text-white placeholder-gray-500 outline-none backdrop-blur-xl transition focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Explore Tutors
            </h2>

            <p className="mt-2 text-gray-400">
              Book one-on-one sessions with
              skilled educators
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300 backdrop-blur-xl">
            {
              filteredTutors.length
            }{" "}
            Tutor
            {filteredTutors.length !==
              1 && "s"}{" "}
            Found
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredTutors.length ===
        0 ? (
          <div className="flex flex-col items-center justify-center rounded-[4xl] border border-dashed border-white/10 bg-white/5 py-24 text-center backdrop-blur-xl">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/10">
              <FaChalkboardTeacher className="text-4xl text-blue-400" />
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              No Tutors Found
            </h3>

            <p className="mt-3 max-w-md text-gray-400">
              Try searching with a different
              keyword or check back later for
              new tutors.
            </p>
          </div>
        ) : (
          <>
            {/* GRID */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredTutors.map(
                (tutor) => (
                  <div
                    key={tutor._id}
                    className="transition duration-300 hover:-translate-y-1"
                  >
                    <TutorCard
                      tutor={tutor}
                      onBook={
                        setSelectedTutor
                      }
                    />
                  </div>
                )
              )}
            </div>

            {/* FOOTER INFO */}
            <div className="mt-10 rounded-3xl border border-blue-500/10 bg-blue-500/5 px-6 py-5 text-blue-300">
              <div className="flex items-center gap-3">
                <FaStar />

                Tutors can offer personalized
                sessions, exam preparation,
                mentoring, and collaborative
                study guidance.
              </div>
            </div>
          </>
        )}
      </div>

      {/* BOOKING MODAL */}
      {selectedTutor && (
        <BookingModal
          tutor={selectedTutor}
          closeModal={() =>
            setSelectedTutor(null)
          }
        />
      )}
    </div>
  );
};

export default Tutors;