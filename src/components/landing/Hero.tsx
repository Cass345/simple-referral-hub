import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School, Target, Users, ClipboardList, ArrowRight } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 pt-16 pb-8 sm:pt-24 sm:pb-16 md:pt-32 lg:pt-40">
          {/* Hero Section */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <School className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <div className="max-w-3xl mx-auto lg:mx-0">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Transform Your</span>
                <span className="block text-indigo-600">Student Support System</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 sm:text-xl">
                Streamline your MTSS process with our comprehensive platform. Track interventions,
                monitor progress, and ensure every student gets the support they need to thrive.
              </p>
            </div>
          </div>
          {/* Features Grid */}
          <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Data-Driven Decisions</h3>
              </div>
              <p className="text-gray-600">Track student progress with interactive charts and comprehensive data analysis tools.</p>
            </div>

            <div className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Collaborative Support</h3>
              </div>
              <p className="text-gray-600">Work seamlessly with your MTSS team to develop and implement effective interventions.</p>
            </div>

            <div className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <ClipboardList className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Streamlined Workflow</h3>
              </div>
              <p className="text-gray-600">Simplify documentation and automate progress monitoring with our intuitive tools.</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Join educators who are transforming student support with our MTSS platform.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate('/decision-tool')}
                className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-50 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-50 blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}