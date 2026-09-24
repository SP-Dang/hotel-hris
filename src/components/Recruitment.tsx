import { Briefcase, Users, UserCheck, Wifi, WifiOff } from 'lucide-react';
import { jobOpenings as mockJobs, applicants as mockApplicants } from '../data/mockData';
import { useSheetData, useApiStatus } from '../hooks/useSheetData';

export default function Recruitment() {
  const { connected } = useApiStatus();
  const { data: jobOpenings, isLive } = useSheetData('80_Job_Openings', mockJobs);
  const { data: applicants } = useSheetData('81_Applicants', mockApplicants);

  const totalApplicants = applicants.length;
  const interviewed = applicants.filter((a: any) => a.Applicant_Status === 'Interviewed').length;

  const getStatusBadge = (s: string) => {
    if (s === 'Open') return 'bg-green-100 text-green-700';
    if (s === 'Closed') return 'bg-gray-100 text-gray-700';
    return 'bg-amber-100 text-amber-700';
  };

  const getApplicantBadge = (s: string) => {
    if (s === 'New') return 'bg-blue-100 text-blue-700';
    if (s === 'Shortlisted') return 'bg-indigo-100 text-indigo-700';
    if (s === 'Interviewed') return 'bg-amber-100 text-amber-700';
    if (s === 'Hired') return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recruitment</h1>
          <p className="text-gray-500 text-sm mt-1">80_Job_Openings / 81_Applicants • {jobOpenings.length} openings</p>
        </div>
        {isLive ? (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <Wifi size={14} className="text-green-600" />
            <span className="text-xs font-medium text-green-700">Live Data</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
            <WifiOff size={14} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-600">Sample Data</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"><Briefcase size={20} className="text-indigo-600" /></div>
          <div><p className="text-2xl font-bold">{jobOpenings.filter((j: any) => j.Job_Status === 'Open').length}</p><p className="text-xs text-gray-500">Open Positions</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><Users size={20} className="text-green-600" /></div>
          <div><p className="text-2xl font-bold">{totalApplicants}</p><p className="text-xs text-gray-500">Total Applicants</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center"><UserCheck size={20} className="text-amber-600" /></div>
          <div><p className="text-2xl font-bold">{interviewed}</p><p className="text-xs text-gray-500">Interviewed</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Openings (80_Job_Openings)</h2>
        <div className="space-y-3">
          {jobOpenings.map((job: any) => (
            <div key={job.Job_ID} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{job.Department_Name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{job.Description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">{job.Employment_Type}</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">{job.Location}</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded">{job.Vacancy_Count} vacancy</span>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadge(job.Job_Status)}`}>{job.Job_Status}</span>
              </div>
              <div className="flex gap-4 mt-3 text-xs text-gray-500">
                <span>📅 Open: {job.Open_Date}</span>
                <span>📅 Close: {job.Closing_Date}</span>
                <span>👥 {job.Total_Applicants_Count || applicants.filter((a: any) => a.Job_ID === job.Job_ID).length} applicants</span>
                <span>🎤 {job.Total_Interviewed} interviewed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Applicants (81_Applicants)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Applicant</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Position</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Education</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Experience</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Expected Salary</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Source</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applicants.map((a: any) => (
                <tr key={a.Applicant_ID} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><div><p className="text-sm font-medium text-gray-900">{a.First_Name} {a.Last_Name}</p><p className="text-xs text-gray-500">{a.Email}</p></div></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{jobOpenings.find((j: any) => j.Job_ID === a.Job_ID)?.Department_Name || a.Job_ID}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.Education_Level}</td>
                  <td className="px-4 py-3 text-sm text-center">{a.Experience_Years} yrs</td>
                  <td className="px-4 py-3 text-sm text-right font-mono">₭{new Intl.NumberFormat('en-LA').format(Number(a.Expected_Salary) || 0)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.Source}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getApplicantBadge(a.Applicant_Status)}`}>{a.Applicant_Status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
