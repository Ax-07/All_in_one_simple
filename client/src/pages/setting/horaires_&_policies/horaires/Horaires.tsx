import { useEffect, type FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../../../stores/store';
import { fetchHoraires, updateSchedule } from './horairesSlices';

const Horaires: FunctionComponent = () => {
    const dispatch = useDispatch<typeof store.dispatch>();
    const schedule = useSelector((state: RootState) => state.horaires.schedule);

      const handleScheduleChange = (
        dayIndex: number,
        field: keyof (typeof schedule)[0],
        value: string | boolean
      ) => {
        dispatch(updateSchedule({ dayIndex, field, value }));
      };

      useEffect(() => {
        if (schedule.length === 0) {
          dispatch(fetchHoraires());
        }
      }, [dispatch, schedule.length]);
      
  return (
    <>
        <h2>Horaires d’Ouverture</h2>
        <p className="section-desc">
          Définissez vos horaires pour le midi et le soir, ou cochez "Fermé" si
          vous n’êtes pas ouvert ce jour.
        </p>

        <table className="hours-table">
          <thead>
            <tr>
              <th>Jour</th>
              <th>Fermé Midi</th>
              <th>Fermé Soir</th>
              <th colSpan={2}>Midi</th>
              <th colSpan={2}>Soir</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Ouverture</th>
              <th>Fermeture</th>
              <th>Ouverture</th>
              <th>Fermeture</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((day, index) => (
              <tr key={day.day}>
                <td>{day.day}</td>
                <td>
                  <input
                    type="checkbox"
                    className="closed-check"
                    checked={day.middayClosed}
                    onChange={(e) =>
                      handleScheduleChange(
                        index,
                        "middayClosed",
                        e.target.checked
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="closed-check"
                    checked={day.eveningClosed}
                    onChange={(e) =>
                      handleScheduleChange(
                        index,
                        "eveningClosed",
                        e.target.checked
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={day.middayOpen}
                    onChange={(e) =>
                      handleScheduleChange(index, "middayOpen", e.target.value)
                    }
                    disabled={day.middayClosed}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={day.middayClose}
                    onChange={(e) =>
                      handleScheduleChange(index, "middayClose", e.target.value)
                    }
                    disabled={day.middayClosed}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={day.eveningOpen}
                    onChange={(e) =>
                      handleScheduleChange(index, "eveningOpen", e.target.value)
                    }
                    disabled={day.eveningClosed}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={day.eveningClose}
                    onChange={(e) =>
                      handleScheduleChange(
                        index,
                        "eveningClose",
                        e.target.value
                      )
                    }
                    disabled={day.eveningClosed}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
};

export default Horaires;